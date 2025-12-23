import React from 'react';
import Bannar from '../../component/Bannar';
import SuccessStories from '../../component/SuccessStories';
import FAQSection from '../../component/FAQSection';
import ContactUs from '../../component/ContactUs';
import AllScholarships from '../../component/AllScholarships';

const Home = () => {
    return (
        <div>
            <Bannar></Bannar>
            <AllScholarships></AllScholarships>
            
            <FAQSection></FAQSection>
            <ContactUs></ContactUs>
            <SuccessStories></SuccessStories>
            
        </div>
    );
};

export default Home;