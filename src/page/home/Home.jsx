import React from 'react';
import Bannar from '../../component/Bannar';
import SuccessStories from '../../component/SuccessStories';
import FAQSection from '../../component/FAQSection';
import ContactUs from '../../component/ContactUs';

const Home = () => {
    return (
        <div>
            <Bannar></Bannar>
            <SuccessStories></SuccessStories>
            <FAQSection></FAQSection>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;