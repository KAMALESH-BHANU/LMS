//package org.example.librarymanagementsystem.service;
//
//import org.example.librarymanagementsystem.model.Member;
//import org.example.librarymanagementsystem.repository.MemberRepository;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//public class MemberService {
//
//    private final MemberRepository memberRepository;
//
//    public MemberService(MemberRepository memberRepository) {
//        this.memberRepository = memberRepository;
//    }
//
//    public Member addMember(Member member) {
//        member.setMembershipStart(LocalDate.now());
//        return memberRepository.save(member);
//    }
//
//    public Member updateMember(Long id, Member updated) {
//        Member member = getMemberById(id);
//        member.setName(updated.getName());
//        member.setEmail(updated.getEmail());
//        member.setPhone(updated.getPhone());
//        return memberRepository.save(member);
//    }
//
//    public void deleteMember(Long id) {
//        memberRepository.deleteById(id);
//    }
//
//    public Member getMemberById(Long id) {
//        return memberRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Member not found"));
//    }
//
//    public List<Member> getMembers(String plan, Boolean expired) {
//
//        if (expired != null && expired)
//            return memberRepository.findByMembershipExpiryBefore(LocalDate.now());
//
//        if (plan != null)
//            return memberRepository.findByPlanPlanName(plan);
//
//        return memberRepository.findAll();
//    }
//
//    public List<?> getBorrowingHistory(Long memberId) {
//        return memberRepository.getBorrowingHistory(memberId);
//    }
//}
package org.librarymanagementsystem.service;

import org.librarymanagementsystem.dto.BookHistoryDTO;
import org.librarymanagementsystem.dto.MemberSearchDTO;
import org.librarymanagementsystem.model.BorrowTransaction;
import org.librarymanagementsystem.model.Member;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.repository.BorrowTransactionRepository;
import org.librarymanagementsystem.repository.MemberRepository;
import org.librarymanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    @Autowired
    private BorrowTransactionRepository borrowRepository;
    public MemberService(MemberRepository memberRepository,
                         UserRepository userRepository) {
        this.memberRepository = memberRepository;
        this.userRepository = userRepository;
    }

    public Member createMembership(Long userId, Long planId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Member member = new Member();
        member.setUser(user);
        member.setMembershipStart(LocalDate.now());
        member.setMembershipExpiry(LocalDate.now().plusMonths(6)); // example

        return memberRepository.save(member);
    }
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
    public List<MemberSearchDTO> searchMembers(String keyword) {
        return memberRepository.searchMembers(keyword);
    }
    public Member getMemberById(Long id) {
        return memberRepository.findById(id).orElseThrow(()-> new RuntimeException("Member not found"));
    }
//    public List<BookHistoryDTO> getBookHistory(Long memberId) {
//
//        List<BorrowTransaction> transactions =
//                borrowRepository.findByMemberIdOrderByBorrowDateDesc(memberId);
//
//        return transactions.stream().map(t -> {
//
//            BookHistoryDTO dto = new BookHistoryDTO();
//
//            dto.setId(t.getId());
//            dto.setTitle(t.getTitle());
//            dto.setAuthor(t.getAuthor());
//            dto.setCoverUrl(t.getCoverUrl());
//            dto.setBorrowDate(t.getBorrowDate());
//            dto.setDueDate(t.getDueDate());
//            dto.setReturnDate(t.getReturnDate());
//            dto.setStatus(t.getStatus());
//
//            return dto;
//
//        }).toList();
//    }
//
//    private BookHistoryDTO convertToDTO(BorrowTransaction t) {
//
//        BookHistoryDTO dto = new BookHistoryDTO();
//
//        dto.setId(t.getId());
//        dto.setTitle(t.getTitle());
//        dto.setAuthor(t.getAuthor());
//        dto.setCoverUrl(t.getCoverUrl());
//        dto.setBorrowDate(t.getBorrowDate());
//        dto.setDueDate(t.getDueDate());
//        dto.setReturnDate(t.getReturnDate());
//        dto.setStatus(t.getStatus());
//
//        return dto;
//    }
}