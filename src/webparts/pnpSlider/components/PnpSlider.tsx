import * as React from 'react';
import styles from './PnpSlider.module.scss';
import { IPnpSliderProps } from './IPnpSliderProps';

import { Carousel, ICarouselImageProps } from "@pnp/spfx-controls-react/lib/Carousel";
import { CarouselButtonsLocation, CarouselButtonsDisplay } from '@pnp/spfx-controls-react';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { sp } from "@pnp/sp/presets/all";

const elements: ICarouselImageProps[] = 
[
  {
    imageSrc: 'https://techexpert.sharepoint.com/sites/Servier-Communication/newsImagesLIbrary/collins-lesulie-Q7QM2WSOTs4-unsplash.jpg',
    title: 'el1',
    description: 'This is Colosseum',
    // url: 'https://en.wikipedia.org/wiki/Colosseum',
    // showDetailsOnHover: true,
    imageFit: ImageFit.cover,
    imgClassName: styles.carouselImage,
    detailsClassName: styles.carouselDetails,
    titleClassName: styles.carouselTitle,
    descriptionClassName: styles.carouselDescription
  },
  {
    imageSrc: 'https://techexpert.sharepoint.com/sites/Servier-Communication/newsImagesLIbrary/ben-guerin-NWrye3NRrKw-unsplash.jpg',
    title: 'el2',
    description: 'This is Colosseum',
    // url: 'https://en.wikipedia.org/wiki/Colosseum',
    // showDetailsOnHover: true,
    imageFit: ImageFit.cover,
    imgClassName: styles.carouselImage,
    detailsClassName: styles.carouselDetails,
    titleClassName: styles.carouselTitle,
    descriptionClassName: styles.carouselDescription
  },
  {
    imageSrc: 'https://techexpert.sharepoint.com/sites/Servier-Communication/newsImagesLIbrary/jeffrey-workman-YvkH8R1zoQM-unsplash.jpg',
    title: 'el3',
    description: 'This is Colosseum',
    // url: 'https://en.wikipedia.org/wiki/Colosseum',
    // showDetailsOnHover: true,
    imageFit: ImageFit.cover,
    imgClassName: styles.carouselImage,
    detailsClassName: styles.carouselDetails,
    titleClassName: styles.carouselTitle,
    descriptionClassName: styles.carouselDescription
  },
];

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
      .getAll(5)
      .then(
        (response: any) => {
          console.log('response status:', response);
          if (response) {
            console.log('response is OK');
            const res = response;
            // .map(
            //   item => 
            //     {
            //     imageSrc: item.imgSrc.Url,
            //     title: item.newsName,
            //     description: 'This is Colosseum',
            //     imageFit: ImageFit.cover,
            //     imgClassName: styles.carouselImage,
            //     detailsClassName: styles.carouselDetails,
            //     titleClassName: styles.carouselTitle,
            //     descriptionClassName: styles.carouselDescription
            //   }
            // );
            return res;
          }
          throw response;
      })
      .then((data) => {
        console.log('data is setting to state');
        setNews(data)
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

  /*   
  Attachments: false
  AuthorId: 20
  ComplianceAssetId: null
  ContentTypeId: "0x0100A53D51D0BF5DB34CAB46A9294BB4800E00E14CC7E65EADAF44ABEB5B1299A3323A"
  Created: "2021-10-11T13:52:54Z"
  EditorId: 20
  FileSystemObjectType: 0
  GUID: "d2965533-e7a8-429f-963f-b50ac9d21dff"
  ID: 21
  Id: 21
  Modified: "2021-10-11T14:03:56Z"
  OData__UIVersionString: "3.0"
  ServerRedirectedEmbedUri: null
  ServerRedirectedEmbedUrl: ""
  Title: null
  imgData: null
  imgSrc: {Description: 'https://techexpert.sharepoint.com/sites/Servier-Co…sLIbrary/collins-lesulie-Q7QM2WSOTs4-unsplash.jpg', Url: 'https://techexpert.sharepoint.com/sites/Servier-Co…sLIbrary/collins-lesulie-Q7QM2WSOTs4-unsplash.jpg'}
  newsBody: "<div class=\"ExternalClass9738E75A8AD7405F901C9475A09B3E5E\"><span style=\"color&#58;black;\"></span>Odit, exercitationem dignissimos?</div>"
  newsCategory: (2) ['top news', 'openings']
  newsCreated: "2021-10-11T13:52:00Z"
  newsDescription: "Description of the news"
  newsImage: null
  newsIsBannerPublished: true
  newsName: "sdf"
  newsPicture: null
  */

  React.useEffect(() => {
    console.log("useEffect is running ...");
    _getListOfNews();
  }, []);

  console.log('news', news);
  
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
            // loadingComponentContainerStyles={styles.loadingComponentContainer}
            elementsCount={5}
            interval={400000}
            isInfinite={true}
            pauseOnHover={true}
            element={elements}
            slide={true}
            indicators={false}
            onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
            onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
            // triggerPageEvent={(index: number) => { console.log(`Page # ${index} is triggering`); }}
          />
        </div>
      </div>
      
    </div>
  )
}
