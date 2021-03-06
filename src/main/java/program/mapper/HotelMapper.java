package program.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import program.dtos.hotels.HotelDto;
import program.dtos.hotels.HotelWithImagesDto;
import program.entities.Hotel;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HotelMapper {
    @Mapping(target = "images", ignore = true)
    Hotel HotelDtoToHotel(HotelDto hotelDto);

    HotelWithImagesDto HotelToHotelWithImagesDto(Hotel hotel);

    List<HotelWithImagesDto> HotelListToHotelWithImagesDtoList(List<Hotel> hotel);

}
