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
class GroupDao
{
    /**
     * 添加项目api分组
     * @param $projectID int 项目ID
     * @param $groupName string 分组名称
     * @return bool
     */
    public function addGroup(&$projectID, &$groupName)
    {
        $db = getDatabase();

        $db->prepareExecute('INSERT INTO eo_api_group (eo_api_group.groupName,eo_api_group.projectID) VALUES (?,?);', array(
            $groupName,
            $projectID
        ));

        $groupID = $db->getLastInsertID();

        if ($db->getAffectRow() < 1)
            return FALSE;
        else
            return $groupID;

    }

    /**
     * 添加子分组
     * @param $projectID int 项目ID
     * @param $groupName string 分组名称
     * @param $parentGroupID int 父分组ID
     * @return bool
     */
    public function addChildGroup(&$projectID, &$groupName, &$parentGroupID)
    {
        $db = getDatabase();

        $db->prepareExecute('INSERT INTO eo_api_group (eo_api_group.groupName,eo_api_group.projectID,eo_api_group.parentGroupID,eo_api_group.isChild) VALUES (?,?,?,1);', array(
            $groupName,
            $projectID,
            $parentGroupID
        ));

        $groupID = $db->getLastInsertID();

        if ($db->getAffectRow() < 1)
            return FALSE;
        else
            return $groupID;
    }

    /**
     * 删除项目api分组
     * @param $groupID int 项目ID
     * @return bool
     */
    public function deleteGroup(&$groupID)
    {
        $db = getDatabase();

        $db->prepareExecute('DELETE FROM eo_api_group WHERE (eo_api_group.groupID = ? OR eo_api_group.parentGroupID = ?);', array($groupID, $groupID));
        $result = $db->getAffectRow();
        $db->prepareExecute('UPDATE eo_api SET eo_api.removed = 1 WHERE eo_api.groupID = ?;', array($groupID));

        if ($result > 0)
            return TRUE;
        else
            return FALSE;

    }

    /**
     * 获取项目api分组
     * @param $projectID int 项目ID
     * @return bool
     */
    public function getGroupList(&$projectID)
    {
        $db = getDatabase();
        $groupList = $db->prepareExecuteAll('SELECT eo_api_group.groupID,eo_api_group.groupName FROM eo_api_group WHERE projectID = ? AND isChild = 0 ORDER BY eo_api_group.groupID DESC;', array($projectID));

        if (is_array($groupList))
            foreach ($groupList as &$parentGroup) {
                $parentGroup['childGroupList'] = array();
                $childGroup = $db->prepareExecuteAll('SELECT eo_api_group.groupID,eo_api_group.groupName,eo_api_group.parentGroupID FROM eo_api_group WHERE projectID = ? AND isChild = 1 AND parentGroupID = ? ORDER BY eo_api_group.groupID DESC;', array(
                    $projectID,
                    $parentGroup['groupID']
                ));

                //判断是否有子分组
                if (!empty($childGroup))
                    $parentGroup['childGroupList'] = $childGroup;
            }

        if (empty($groupList))
            return FALSE;
        else
            return $groupList;
    }

    /**
     * 修改项目api分组
     * @param $groupID int 分组ID
     * @param $groupName string 分组名称
     * @param $parentGroupID int 父分组ID
     * @return bool
     */
    public function editGroup(&$groupID, &$groupName, &$parentGroupID)
    {
        $db = getDatabase();

        if (!$parentGroupID) {
            $db->prepareExecute('UPDATE eo_api_group SET eo_api_group.groupName = ?,eo_api_group.isChild = 0 WHERE eo_api_group.groupID = ?;', array(
                $groupName,
                $groupID
            ));
        } else {
            $db->prepareExecute('UPDATE eo_api_group SET eo_api_group.groupName = ?,eo_api_group.parentGroupID = ?,eo_api_group.isChild = 1 WHERE eo_api_group.groupID = ?;', array(
                $groupName,
                $parentGroupID,
                $groupID
            ));
        }

        if ($db->getAffectRow() > 0)
            return TRUE;
        else

            return FALSE;

    }

    /**
     * 判断分组和用户是否匹配
     * @param $groupID int 分组ID
     * @param $userID int 用户ID
     * @return bool
     */
    public function checkGroupPermission(&$groupID, &$userID)
    {
        $db = getDatabase();
        $result = $db->prepareExecute('SELECT eo_conn_project.projectID FROM eo_conn_project INNER JOIN eo_api_group ON eo_api_group.projectID = eo_conn_project.projectID WHERE userID = ? AND groupID = ?;', array(
            $userID,
            $groupID
        ));

        if (empty($result))
            return FALSE;
        else
            return $result['projectID'];
    }

    /**
     * 更新分组排序
     * @param $projectID int 项目ID
     * @param $orderList string 排序列表
     * @return bool
     */
    public function sortGroup(&$projectID, &$orderList)
    {
        $db = getDatabase();
        $db->prepareExecute('REPLACE INTO eo_api_group_order(projectID, orderList) VALUES (?,?);', array(
            $projectID,
            $orderList
        ));
        if ($db->getAffectRow() > 0)
            return TRUE;
        else
            return FALSE;
    }

    /**
     * 获取分组排序列表
     * @param $projectID int 项目ID
     * @return bool
     */
    public function getGroupOrderList(&$projectID)
    {
        $db = getDatabase();
        $result = $db->prepareExecute('SELECT eo_api_group_order.orderList FROM eo_api_group_order WHERE eo_api_group_order.projectID = ?;', array(
            $projectID
        ));
        if (empty($result)) {
            return FALSE;
        } else {
            return $result['orderList'];
        }
    }

    /**
     * 获取分组名称
     * @param $group_id
     * @return bool
     */
    public function getGroupName(&$group_id)
    {
        $db = getDatabase();
        $result = $db->prepareExecute('SELECT eo_api_group.groupName FROM eo_api_group WHERE eo_api_group.groupID = ?;', array($group_id));
        if (empty($result)) {
            return FALSE;
        } else {
            return $result['groupName'];
        }
    }
}

?>