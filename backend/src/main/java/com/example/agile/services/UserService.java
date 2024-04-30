//package com.example.agile.services;
//
//import com.example.agile.objecs.ELabel;
//import com.example.agile.objecs.Label;
//import com.example.agile.objecs.User;
//import com.example.agile.repositories.LabelRepo;
//import com.example.agile.repositories.UserRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.HashSet;
//import java.util.Set;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserRepo userRepository;
//
//    @Autowired
//    private LabelRepo labelRepository;
//
//    public User addUserLabel(Long userId, ELabel labelName) {
//        User user = userRepository.findById(userId).orElse(null);
//        Label label = labelRepository.findByName(labelName).orElse(null);
//
//        if (user != null && label != null) {
//            Set<Label> labels = user.getLabels();
//            if (labels == null) {
//                labels = new HashSet<>();
//            }
//            labels.add(label);
//            user.setLabels(labels);
//            return userRepository.save(user);
//        }
//
//        return null;
//    }
//}
