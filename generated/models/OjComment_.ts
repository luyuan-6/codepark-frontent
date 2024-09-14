/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 评论
 */
export type OjComment_ = {
    /**
     * 回复条数
     */
    commentNum?: number;
    /**
     * 评论内容
     */
    content?: string;
    /**
     * 被回复的记录id
     */
    fromId?: number;
    /**
     * 回复人名称
     */
    fromName?: string;
    /**
     * 创建时间
     */
    gmtCreate?: string;
    /**
     * 更新时间
     */
    gmtModified?: string;
    /**
     * 主键id
     */
    id?: number;
    /**
     * 是否显示输入框
     */
    inputShow?: boolean;
    /**
     * 逻辑删除 1（true）已删除， 0（false）未删除
     */
    isDeleted?: boolean;
    /**
     * 是否点赞
     */
    isLike?: boolean;
    /**
     * 点赞数量
     */
    likeCount?: number;
    /**
     * 点赞id列表
     */
    likeListId?: string;
    /**
     * 父级评论id
     */
    parentId?: number;
    /**
     * 问题id
     */
    questionId?: number;
    /**
     * 用户头像
     */
    userAvatar?: string;
    /**
     * 用户id
     */
    userId?: number;
    /**
     * 用户昵称
     */
    userName?: string;
};

