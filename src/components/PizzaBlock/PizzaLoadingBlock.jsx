import React from 'react';
import ContentLoader from "react-content-loader";

function PizzaLoadingBlock() {
    return (
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="142" cy="132" r="120" />
            <rect x="2" y="270" rx="6" ry="6" width="280" height="26" />
            <rect x="1" y="304" rx="6" ry="6" width="280" height="84" />
            <rect x="8" y="406" rx="6" ry="6" width="84" height="31" />
            <rect x="140" y="401" rx="20" ry="20" width="139" height="37" />
        </ContentLoader>
    );
}

export default PizzaLoadingBlock;