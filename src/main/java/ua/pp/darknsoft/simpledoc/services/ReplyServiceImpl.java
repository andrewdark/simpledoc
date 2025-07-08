package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.resolution.ReplyDTOToReplyConverter;
import ua.pp.darknsoft.simpledoc.converters.resolution.ReplyToReplyDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.ReplyDTO;
import ua.pp.darknsoft.simpledoc.entities.Citizen;
import ua.pp.darknsoft.simpledoc.entities.Reply;
import ua.pp.darknsoft.simpledoc.entities.enums.ReplyType;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.ReplyRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;
    private final ReplyDTOToReplyConverter toEntityConverter;
    private final ReplyToReplyDTOConverter toDTOConverter;

    @Override
    @Transactional
    public ReplyDTO add(ReplyDTO replyDTO) throws AppException {
        try {
            replyDTO.setId(null);

            Reply reply = toEntityConverter.convert(replyDTO);
            return toDTOConverter.convert(replyRepository.save(reply));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<ReplyDTO> addAll(Iterable<ReplyDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public ReplyDTO update(Long id, ReplyDTO newDTO) throws AppException {
        try {
            Reply entity = replyRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setReplyDate(newDTO.getReplyDate());
            entity.setReplyType(newDTO.getReplyType());
            entity.setContent(newDTO.getContent());

            return toDTOConverter.convert(replyRepository.save(entity));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<ReplyDTO> updateAll(Map<Long, ReplyDTO> newDtoMap) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public void deleteById(Long id) throws AppException {
        try {
            replyRepository.deleteById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public void softDeleteById(Long id) throws AppException {
        try {
            this.deleteById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Optional<ReplyDTO> getById(Long id) throws AppException {
        try {
            return replyRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<ReplyDTO> findAll(Pageable pageable) throws AppException {
        try {
            return replyRepository.findAll(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        try {
            return replyRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
