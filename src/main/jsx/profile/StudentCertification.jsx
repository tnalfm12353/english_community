import React from 'react';
import styled from 'styled-components';

const StudentCertification = () =>{

    return(
        <StudentCertificationContainer>
            추후 조교 혹은 학생회 측에서 영어학부 학생 인증
        </StudentCertificationContainer>
    );
}

export default StudentCertification;

const StudentCertificationContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding:1rem;
    height:auto;
`