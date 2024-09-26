package de.monteurzimmer.monteurzimmer_booking.photo_management.entity;

import org.springframework.web.multipart.MultipartFile;

public class PhotoUploadRequest {
    private MultipartFile photoFile;
    private boolean isPrimary;


    public MultipartFile getPhotoFile() {
        return photoFile;
    }

    public void setPhotoFile(MultipartFile photoFile) {
        this.photoFile = photoFile;
    }

    public boolean isPrimary() {
        return isPrimary;
    }

    public void setPrimary(boolean primary) {
        isPrimary = primary;
    }
}

