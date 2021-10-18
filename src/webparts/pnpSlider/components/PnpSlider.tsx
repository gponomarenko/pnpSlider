import * as React from 'react';
import styles from './PnpSlider.module.scss';
import { IPnpSliderProps } from './IPnpSliderProps';

import { Carousel, ICarouselImageProps } from "@pnp/spfx-controls-react/lib/Carousel";
import { CarouselButtonsLocation, CarouselButtonsDisplay } from '@pnp/spfx-controls-react';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { sp } from "@pnp/sp/presets/all";

export const PnpSlider: React.FunctionComponent<IPnpSliderProps> = (props) => {
  const [news, setNews] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const _getListOfNews = React.useCallback(
    () => {
    sp.web.lists
      .getByTitle('news')
      .items
      .select(
        '*'
      )
      .top(5)
      .get()      
      .then(
        (response: any) => {
          console.log('response status:', response);
          if (response) {
            console.log('response is OK');
            console.log('data is setting to state');
        const newsList: ICarouselImageProps[] = response
              .map(
                item => 
                  ({
                  imageSrc: item.imgSrc.Url,
                  title: item.newsName,
                  description: item.newsDescription,
                  imageFit: ImageFit.cover,
                  imgClassName: styles.carouselImage,
                  detailsClassName: styles.carouselDetails,
                  titleClassName: styles.carouselTitle,
                  descriptionClassName: styles.carouselDescription
                })
              );
            setNews(newsList);
            return newsList;
          }
          throw response;
      })
      .catch((e) => {
        console.log(`Error fetching data. Name: ${e.name}. Message: ${e.message}`);        
        setError(error);
      }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [],
  );

  React.useEffect(() => {
    _getListOfNews();
  }, []);
    
  return (
    <div className={styles.carousel}>
      <div className={styles.carouselLabel}>
        <a href="#" className={styles.carouselLink}>NEWS</a>
        </div>
      <div className="ms-Grid">
        <div className="ms-Grid-row">       
          <Carousel
            buttonsLocation={CarouselButtonsLocation.center}
            buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
            containerStyles={styles.carouselContainer}
            contentContainerStyles={styles.carouselContent}
            elementsCount={5}
            interval={15000}
            isInfinite={true}
            pauseOnHover={true}
            element={news}
            slide={true}
            indicators={false}
            onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
            onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
          />
        </div>
      </div>
      
    </div>
  )
}
