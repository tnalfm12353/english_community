package hong.bufs.english_community.domain;

import java.time.LocalDateTime;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseTimeEntity {
    
    @CreatedDate
    @Basic(fetch = FetchType.EAGER)
    private LocalDateTime createdDateTime;

    @LastModifiedDate
    @Basic(fetch = FetchType.EAGER)
    private LocalDateTime lastModifiedDateTime;
}
