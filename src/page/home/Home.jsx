import React from 'react';
import Bannar from '../../component/Banner';
import SuccessStories from '../../component/SuccessStories';
import FAQSection from '../../component/FAQSection';
import ContactUs from '../../component/ContactUs';
import AllScholarships from '../../component/AllScholarships';
import Banner from '../../component/Banner';
import TopScholarships from '../../component/TopScholarships';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopScholarships></TopScholarships>

            <AllScholarships></AllScholarships>
            
            <FAQSection></FAQSection>
            <ContactUs></ContactUs>
            <SuccessStories></SuccessStories>
            
        </div>
    );
};

export default Home;