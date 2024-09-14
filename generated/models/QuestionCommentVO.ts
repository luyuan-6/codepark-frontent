/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QuestionCommentVO = {
    commentNum?: number;
    content?: string;
    fromId?: number;
    fromName?: string;
    gmtCreate?: string;
    gmtModified?: string;
    id?: number;
    inputShow?: boolean;
    isLike?: boolean;
    likeCount?: number;
    likeListId?: Array<string>;
    parentId?: number;
    questionId?: number;
    reply?: Array<QuestionCommentVO>;
    userAvatar?: string;
    userId?: number;
    userName?: string;
};

