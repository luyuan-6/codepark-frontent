/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_int_ } from "../models/BaseResponse_int_";
import type { BaseResponse_List_QuestionCommentVO_ } from "../models/BaseResponse_List_QuestionCommentVO_";
import type { CommentAddRequest } from "../models/CommentAddRequest";
import type { OjComment_ } from "../models/OjComment_";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class QuestionCommentsControllerService {
  /**
   * addQuestionComment
   * @param currentComment currentComment
   * @param parent parent
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addQuestionCommentUsingPost(
    currentComment: OjComment_,
    parent?: OjComment_
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question_comment/addComment",
      body: parent,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * deleteQuestion
   * @param currentComment currentComment
   * @returns BaseResponse_int_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteQuestionUsingPost(
    currentComment: OjComment_
  ): CancelablePromise<BaseResponse_int_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question_comment/deleteComment",
      body: currentComment,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getCommentList
   * @param id id
   * @returns BaseResponse_List_QuestionCommentVO_ OK
   * @throws ApiError
   */
  public static getCommentListUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_List_QuestionCommentVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question_comment/getCommentList",
      query: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateQuestionComment
   * @param currentComment currentComment
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateQuestionCommentUsingPost(
    currentComment: OjComment_
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question_comment/updateLikeCount",
      body: currentComment,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * addQuestionCommentWrap
   * @param commentAddRequest commentAddRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addQuestionCommentWrapUsingPost(
    commentAddRequest: CommentAddRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question_comment/wrap/addComment",
      body: commentAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
