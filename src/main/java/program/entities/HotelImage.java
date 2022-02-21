package program.entities;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "tbl_hotel_images")
public class HotelImage {
    public HotelImage() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 200, nullable = false)
    private String name;


    @ManyToOne
    private Hotel hotel;

    public HotelImage(String name) {
        this.name = name;
    }
}
