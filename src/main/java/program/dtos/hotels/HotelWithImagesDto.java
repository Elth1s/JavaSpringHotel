package program.dtos.hotels;

import lombok.Data;
import program.dtos.hotel.images.HotelImageDto;

import java.util.List;

@Data
public class HotelWithImagesDto {
    private int id;
    private String name;
    private String description;
    private List<HotelImageDto> images;
}
