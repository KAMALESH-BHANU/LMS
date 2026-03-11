package org.librarymanagementsystem.controller;

import org.librarymanagementsystem.dto.BookHistoryDTO;
import org.librarymanagementsystem.dto.MemberSearchDTO;
import org.librarymanagementsystem.model.Member;
import org.librarymanagementsystem.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

//    @PostMapping
//    public Member addMember(@RequestBody Member member) {
//        return memberService.addMember(member);
//    }
//
//    @PutMapping("/{id}")
//    public Member updateMember(@PathVariable Long id,
//                               @RequestBody Member member) {
//        return memberService.updateMember(id, member);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteMember(@PathVariable Long id) {
//        memberService.deleteMember(id);
//    }
//
//    @GetMapping("/{id}")
//    public Member getMember(@PathVariable Long id) {
//        return memberService.getMemberById(id);
//    }
//
//    @GetMapping
//    public List<Member> getMembers(
//            @RequestParam(required = false) String plan,
//            @RequestParam(required = false) Boolean expired) {
//
//        return memberService.getMembers(plan, expired);
//    }
//
//    // Borrowing history
//    @GetMapping("/{id}/history")
//    public List<?> getHistory(@PathVariable Long id) {
//        return memberService.getBorrowingHistory(id);
//    }

    @PostMapping("/{userId}")
    public Member createMembership(
            @PathVariable Long userId,
            @RequestParam Long planId
    ) {
        return memberService.createMembership(userId, planId);
    }
    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }
    @GetMapping("/search")
    public List<MemberSearchDTO> searchMembers(@RequestParam String keyword) {
        return memberService.searchMembers(keyword);
    }
    @GetMapping("/{id}")
    public Member getMember(@PathVariable Long id) {
        return memberService.getMemberById(id);
    }

}
