<?php

/**
 * @name eolinker ams open source，eolinker开源版本
 * @link https://www.eolinker.com/
 * @package eolinker
 * @author www.eolinker.com 广州银云信息科技有限公司 2015-2017
 * eoLinker是目前全球领先、国内最大的在线API接口管理平台，提供自动生成API文档、API自动化测试、Mock测试、团队协作等功能，旨在解决由于前后端分离导致的开发效率低下问题。
 * 如在使用的过程中有任何问题，欢迎加入用户讨论群进行反馈，我们将会以最快的速度，最好的服务态度为您解决问题。
 *
 * eoLinker AMS开源版的开源协议遵循Apache License 2.0，如需获取最新的eolinker开源版以及相关资讯，请访问:https://www.eolinker.com/#/os/download
 *
 * 官方网站：https://www.eolinker.com/
 * 官方博客以及社区：http://blog.eolinker.com/
 * 使用教程以及帮助：http://help.eolinker.com/
 * 商务合作邮箱：market@eolinker.com
 * 用户讨论QQ群：284421832
 */
class AutomatedTestCaseGroupDao
{

    /**
     * 添加分组
     * @param $project_id
     * @param $group_name
     * @return bool
     */
    public function addGroup(&$project_id, &$group_name)
    {
        $db = getDatabase();

        $db->prepareExecute('INSERT INTO eo_project_test_case_group (eo_project_test_case_group.groupName,eo_project_test_case_group.projectID) VALUES (?,?);', array(
            $group_name,
            $project_id,
        ));

        if ($db->getAffectRow() > 0)
            return $db->getLastInsertID();
        else
            return FALSE;
    }


    /**
     * 添加子分组
     * @param $project_id
     * @param $group_name
     * @param $parent_group_id
     * @return bool
     */
    public function addChildGroup(&$project_id, &$group_name, &$parent_group_id)
    {
        $db = getDatabase();

        $db->prepareExecute('INSERT INTO eo_project_test_case_group (eo_project_test_case_group.groupName,eo_project_test_case_group.projectID,eo_project_test_case_group.parentGroupID,eo_project_test_case_group.isChild) VALUES (?,?,?,1);', array(
            $group_name,
            $project_id,
            $parent_group_id
        ));

        if ($db->getAffectRow() > 0)
            return $db->getLastInsertID();
        else
            return FALSE;
    }

    /**
     * 删除用例分组
     * @param $project_id
     * @param $group_id
     * @return bool
     */
    public function deleteGroup(&$project_id, &$group_id)
    {
        $db = getDatabase();
        try {
            $db->beginTransaction();
            $db->prepareExecuteAll('DELETE FROM eo_project_test_case_group WHERE eo_project_test_case_group.groupID = ? AND eo_project_test_case_group.projectID = ?;', array($group_id, $project_id));
            if ($db->getAffectRow() < 1)
                throw new \PDOException('delete error');
            $db->prepareExecuteAll('DELETE FROM eo_project_test_case_single WHERE eo_project_test_case_single.caseID IN (SELECT eo_project_test_case.caseID FROM eo_project_test_case WHERE eo_project_test_case.projectID = ?);', array(
                $project_id
            ));
            $db->prepareExecuteAll("DELETE FROM eo_project_test_case WHERE eo_project_test_case.groupID = ?;", array($group_id));
            $db->prepareExecuteAll('DELETE eo_project_test_case FROM eo_project_test_case INNER JOIN eo_project_test_case_group ON eo_project_test_case.groupID = eo_project_test_case_group.groupID  WHERE eo_project_test_case_group.parentGroupID = ?;', array($group_id));
            $db->prepareExecuteAll('DELETE FROM eo_project_test_case_group WHERE eo_project_test_case_group.parentGroupID = ?;', array($group_id));
            $db->commit();
            return TRUE;
        } catch (\PDOException $e) {
            $db->rollback();
            return FALSE;
        }
    }

    /**
     * 获取用例分组
     * @param $project_id
     * @return bool|array
     */
    public function getGroupList(&$project_id)
    {
        $db = getDatabase();
        $result = array();
        $group_list = $db->prepareExecuteAll('SELECT eo_project_test_case_group.groupID,eo_project_test_case_group.groupName FROM eo_project_test_case_group WHERE eo_project_test_case_group.projectID = ? AND eo_project_test_case_group.isChild = 0 ORDER BY  eo_project_test_case_group.groupName ASC;', array($project_id));

        //检查是否含有子分组
        if (is_array($group_list)) {
            foreach ($group_list as &$parentGroup) {
                $parentGroup['childGroupList'] = array();
                $childGroup = $db->prepareExecuteAll('SELECT eo_project_test_case_group.groupID,eo_project_test_case_group.groupName,eo_project_test_case_group.parentGroupID FROM eo_project_test_case_group WHERE eo_project_test_case_group.projectID = ? AND eo_project_test_case_group.isChild = 1 AND eo_project_test_case_group.parentGroupID = ? ORDER BY eo_project_test_case_group.groupName ASC;', array(
                    $project_id,
                    $parentGroup['groupID']
                ));

                //判断是否有子分组
                if (!empty($childGroup))
                    $parentGroup['childGroupList'] = $childGroup;
            }
        }

        $result['groupList'] = $group_list;
        $group_order = $db->prepareExecute('SELECT eo_project_test_case_group_order.orderList FROM eo_project_test_case_group_order WHERE eo_project_test_case_group_order.projectID = ?;', array(
            $project_id
        ));
        $result['groupOrder'] = $group_order['orderList'];

        if (empty($group_list))
            return FALSE;
        else
            return $result;
    }

    /**
     * 修改用例分组
     * @param $project_id
     * @param $group_id
     * @param $group_name
     * @param $parent_group_id
     * @return bool
     */
    public function editGroup(&$project_id, &$group_id, &$group_name, &$parent_group_id)
    {
        $db = getDatabase();

        //如果没有父分组
        if ($parent_group_id <= 0) {
            $db->prepareExecute('UPDATE eo_project_test_case_group SET eo_project_test_case_group.groupName = ?,eo_project_test_case_group.parentGroupID = 0,eo_project_test_case_group.isChild = 0 WHERE eo_project_test_case_group.groupID = ? AND eo_project_test_case_group.projectID = ?;', array(
                $group_name,
                $group_id,
                $project_id
            ));
        } else {
            //有父分组
            $db->prepareExecute('UPDATE eo_project_test_case_group SET eo_project_test_case_group.groupName = ?,eo_project_test_case_group.parentGroupID = ?,eo_project_test_case_group.isChild = 1 WHERE eo_project_test_case_group.groupID = ? AND eo_project_test_case_group.projectID = ?;', array(
                $group_name,
                $parent_group_id,
                $group_id,
                $project_id
            ));
        }

        if ($db->getAffectRow() > 0)
            return TRUE;
        else
            return FALSE;
    }

    /**
     * 获取分组名称
     * @param $group_id
     * @return bool
     */
    public function getGroupName($group_id)
    {
        $db = getDatabase();
        $result = $db->prepareExecute("SELECT eo_project_test_case_group.groupName FROM eo_project_test_case_group WHERE eo_project_test_case_group.groupID = ?;", array($group_id));

        if (empty($result))
            return FALSE;
        else
            return $result['groupName'];
    }

    /**
     * 更新分组排序
     * @param $project_id
     * @param $order_list
     * @return bool
     */
    public function updateGroupOrder(&$project_id, &$order_list)
    {
        $db = getDatabase();
        $db->prepareExecute("REPLACE INTO eo_project_test_case_group_order(projectID,orderList)VALUES(?,?);", array($project_id, $order_list));
        if ($db->getAffectRow() > 0)
            return TRUE;
        else
            return FALSE;

    }

    /**
     * 检查分组权限
     * @param $group_id
     * @param $user_id
     * @return bool
     */
    public function checkAutomatedTestCaseGroupPermission(&$group_id, &$user_id)
    {
        $db = getDatabase();
        $result = $db->prepareExecute('SELECT eo_conn_project.projectID FROM eo_project_test_case_group INNER JOIN eo_conn_project ON eo_project_test_case_group.projectID = eo_conn_project.projectID WHERE eo_project_test_case_group.groupID = ? AND eo_conn_project.userID = ?;', array($group_id, $user_id));
        if (empty($result)) {
            return FALSE;
        } else {
            return $result['projectID'];
        }
    }
}