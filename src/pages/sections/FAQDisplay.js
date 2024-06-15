//FAQDisplay.js

import React from 'react';
import GlobalContainer from '../../components/ui/GlobalContainer';
import faqData from '../../data/faqData.json';

function FAQDisplay({ className }) {
  return (

    <div className={`FAQDisplay-section pt-48 pb-32 w-full ${className}`}>
    
      <GlobalContainer>

        <h1 className="text-center mb-14 ">FAQs</h1>

        {faqData.faqs.map((faq) => (
          <div className="mb-10 text-left" key={faq.id}>
            <h6 className="mb-4 text-center">{faq.question}</h6>
            <p>{faq.answer}</p>
          </div>
        ))}

      </GlobalContainer>
  
  </div>

  );
}

export default FAQDisplay;
