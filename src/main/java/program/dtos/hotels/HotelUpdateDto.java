package program.dtos.hotels;

import lombok.Data;

import java.util.List;

@Data
public class HotelUpdateDto {
    private String name;
    private String description;
    private List<String> uploadImages;
    private List<String> deleteImages;
}