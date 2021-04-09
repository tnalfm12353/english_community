import React from 'react';
import styled from 'styled-components';
import PostAccountTemplate from '../PostAccountTemplate.jsx';
import PostUpdateButton from '../../components/PostUpdateButton.jsx';
import CommentUpdateToggle from '../../components/CommentUpdateToggle.jsx';
import ReportToggle from '../../components/ReportToggle.jsx';
const RegisteredComment = ({account,time,comment,commentId,deleteComment}) =>{

    return(
        <Template>
            <PostAccountTemplate 
                account = {account} time={time}
                updateButton ={<PostUpdateButton 
                    account = {account}
                        ownerToggleContent ={<CommentUpdateToggle
                                                deleteComment = {deleteComment}
                                                commentId = {commentId}
                                            />}
                        guestToggleContent ={<ReportToggle/>}
                    />
    }
            />
            <Comment>{comment}</Comment>
        </Template>
    )
}

export default RegisteredComment;

const Template = styled.div`
    border-radius: 8px;
    border:1px solid rgba(0,0,0,.1);
    margin-bottom:25px;
`

const Comment = styled. div`
    padding:10px;
    align-self:center;
    font-size: .9rem;
    line-height:1.3rem;
`