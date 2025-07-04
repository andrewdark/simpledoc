import React, {FC} from 'react';
import css from './RubricItem.module.css';

interface IRubricProps {
    
}

const RubricItem: FC<IRubricProps> = (props) => {
    return (
        <div className={css.rubricItem}>
            RubricItem
        </div>
    );
};

export default RubricItem;
