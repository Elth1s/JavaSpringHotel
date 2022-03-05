package program.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import program.dtos.hotel.images.HotelImageDto;
import program.dtos.hotels.HotelDto;
import program.dtos.hotels.HotelWithImagesDto;
import program.entities.Hotel;
import program.entities.HotelImage;

@Mapper(componentModel = "spring")
public interface HotelImageMapper {
    HotelImageDto HotelImageToHotelImageDto(HotelImage hotelImage);
}
