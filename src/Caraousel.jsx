import { useEffect, useState } from 'react';
import { shortList, list, longList } from './data';
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideByUser, setSlideByUser] = useState(0);
  const handlePrevClick = () => {
    setCurrentIndex((oldIndex) => {
      return (oldIndex - 1+people.length) % people.length;
    });
    incrementSlideByUser();
  };
  const handleNextClick = () => {
    setNextIndex();
    incrementSlideByUser();
  };

  const setNextIndex = () => {
    setCurrentIndex((oldIndex) => {
      const result = (oldIndex + 1) % people.length;
      return result;
    });
  }

  const incrementSlideByUser = () => {
    const nextVal = slideByUser+1;
    setSlideByUser(nextVal);
  }

  useEffect(() => {
    console.log("effect runs");
    const intervalId = setInterval(() => {
      setNextIndex();
    }, 2000);
    return () => {console.log("clearing"); clearInterval(intervalId)};
  }, [slideByUser])
  return (
    <section className='slider-container'>
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            className='slide'
            key={id}
            style={{
              transform: `translateX(${100 * (personIndex - currentIndex)}%)`,
              opacity: (currentIndex === personIndex)?1:0,
              visibility: (currentIndex === personIndex)?1:0
            }}
          >
            <img src={image} alt={name} className='person-img' />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon'></FaQuoteRight>
            <button className='prev' onClick={handlePrevClick}>
              <FiChevronLeft />
            </button>
            <button className='next' onClick={handleNextClick}>
              <FiChevronRight />
            </button>
          </article>
        );
      })}
    </section>
  );
};

export default Carousel;
