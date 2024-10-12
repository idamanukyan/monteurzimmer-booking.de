import React, {useEffect, useRef} from 'react';
import styles from './CheapestProducts.module.css';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import {PropertyMainFields} from "../../../data/model/PropertiesModel";

interface CheapestPropertiesProps {
    cheapestProperties: PropertyMainFields[]
}

const CheapestProducts: React.FC<CheapestPropertiesProps> = ({ cheapestProperties }) => {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const flickityOptions = {
        initialIndex: 0,
        freeScroll: true,
        contain: true,
        pageDots: false,
        prevNextButtons: true,
        autoPlay: 1500,
        wrapAround: true,
    };

    useEffect(() => {
        if (carouselRef.current) {
            const flkty = new Flickity(carouselRef.current, flickityOptions);

            return () => {
                flkty.destroy();
            };
        }
    }, [flickityOptions]);


    return (
        <div className="carousel-container" ref={carouselRef}>
            {cheapestProperties.map((property, index) => (
                <div className="carousel-cell" key={index}>
                    <div className={styles.carouselCellContainer}>
                        <img src={property.image} alt={''} />
                        <div>
                            <h3>{property.title}</h3>
                            <h5>{property.description || "No description available"}</h5>
                        </div>
                        <h2>€400</h2>
                    </div>
                </div>
            ))}
        </div>
    );
    // return (
    //     <div className="carousel-container" ref={carouselRef}>
    //         <div className="carousel-cell">
    //             <div className={styles.carouselCellContainer}>
    //                 <img src={'/assets/images/favProd1.jpeg'} alt={''}/>
    //                 <div>
    //                     <h3>Title 1</h3>
    //                     <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
    //                 </div>
    //                 <h2>€450</h2>
    //             </div>
    //         </div>
    //         <div className="carousel-cell">
    //             <div className={styles.carouselCellContainer}>
    //                 <img src={'/assets/images/favProd2.jpeg'} alt={''}/>
    //                 <div>
    //                     <h3>Title 2</h3>
    //                     <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
    //                 </div>
    //                 <h2>€450</h2>
    //             </div>
    //         </div>
    //         <div className="carousel-cell">
    //             <div className={styles.carouselCellContainer}>
    //                 <img src={'/assets/images/favProd3.jpeg'} alt={''}/>
    //                 <div>
    //                     <h3>Title 3</h3>
    //                     <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
    //                 </div>
    //                 <h2>€450</h2>
    //             </div>
    //         </div>
    //         <div className="carousel-cell">
    //             <div className={styles.carouselCellContainer}>
    //                 <img src={'/assets/images/favProd1.jpeg'} alt={''}/>
    //                 <div>
    //                     <h3>Title 4</h3>
    //                     <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
    //                 </div>
    //                 <h2>€450</h2>
    //             </div>
    //         </div>
    //         <div className="carousel-cell">
    //             <div className={styles.carouselCellContainer}>
    //                 <img src={'/assets/images/favProd2.jpeg'} alt={''}/>
    //                 <div>
    //                     <h3>Title 5</h3>
    //                     <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
    //                 </div>
    //                 <h2>€450</h2>
    //             </div>
    //         </div>
    //         <div className="carousel-cell">
    //             <div className={styles.carouselCellContainer}>
    //                 <img src={'/assets/images/favProd3.jpeg'} alt={''}/>
    //                 <div>
    //                     <h3>Title 6</h3>
    //                     <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
    //                 </div>
    //                 <h2>€450</h2>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default CheapestProducts;
