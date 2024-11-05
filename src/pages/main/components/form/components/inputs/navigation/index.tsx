import classes from "./classes.module.scss";
import arrow_right from "./assets/arrow-right.png"
import arrow_left from "./assets/arrow-left.png"
import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import { IData } from "@/models/formData";


const Navigation: React.FC<{
    selectedIndex: number,
    setSelectedIndex: Dispatch<SetStateAction<number>>,
    inputRefs: MutableRefObject<(HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[]>,
    handleNavigationClick: (i: number) => void,
    formData: IData,
}> = ({ selectedIndex, setSelectedIndex, inputRefs, handleNavigationClick, formData }) => {

    const handleArrowClick = (direction: number) => {
        const newIndex = selectedIndex + direction;
        if (newIndex >= 0 && newIndex < inputRefs.current.length) {
            setSelectedIndex(newIndex);
            inputRefs.current[newIndex]?.focus();
        }
    };

    return(
        <>
            <nav className={classes.nav_container}>
                <img
                    src={arrow_left}
                    className={`${classes.arrow_left} ${selectedIndex === 0 ? classes.hidden : ''}`}
                    onClick={() => handleArrowClick(-1)}
                    alt={""}
                />

                {[ ...Array(4) ].map((_, index) => (
                    <div
                        key={index}
                        className={`${classes.nav_item} ${selectedIndex === index ? classes.selected : ''} ${formData[Object.keys(formData)[index !== 3 ? index : 4]] ? classes.filled : ''}`}
                        onClick={() => handleNavigationClick(index)}
                    >
                        {index + 1}
                    </div>
                ))}

                <img
                    src={arrow_right}
                    className={`${classes.arrow_right} ${selectedIndex === 3 ? classes.hidden : ''}`}
                    onClick={() => handleArrowClick(1)}
                    alt={""}
                />
            </nav>
        </>
    )
}

export default Navigation;
