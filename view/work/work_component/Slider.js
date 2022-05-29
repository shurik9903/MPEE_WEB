import React, {useState, useEffect, useRef} from 'react';

import slider_style from '../../css/Slider_style.css';

function Slider_Range(props) {

    const {
        step, 
        min, 
        max, 
        value, 
        defaultLength, 
        OnChangeValue
    } = props;

    const rangeRef = useRef();
    const [range, setRange] = useState(defaultLength);

    useEffect(() => {
        const rangeValue = parseInt(rangeRef.current.value, 10);
        rangeLinearGradient(rangeValue, min, max);

    }, [rangeRef, min, max]);


    const calculatePercentage = (value, min, max) => {
        return ((value - min) / (max - min)) * 100;
    }

    const rangeLinearGradient = (value, min, max) => {
        const percentage = calculatePercentage(value, min, max);

        const newBackgroundStyle = `linear-gradient(90deg, var(--main-slider-min-color1) ${percentage* 0.1 + '%'}, var(--main-slider-min-color2) ${percentage + '%'}, var(--main-slider-max-color) ${percentage + '%'} 100%)`;
        
        rangeRef.current.style.background = newBackgroundStyle;
    }

    const HandleChange = max => e => {

        let value = e.target.value;
        OnChangeValue(value);
        setRange(value);
        rangeLinearGradient(value, min, max);
    }

    return(
        <>
            <div className={slider_style.slider}>
                <input className={slider_style.slider_range} 
                ref={rangeRef}
                type='range'
                step={step}
                min={min}
                max={max}
                value={value}
                onChange={HandleChange(max)}
                />
                <div className={slider_style.slider_value}>{value}</div>
                <div className={slider_style.slider_min_max}>
                    <div>{min}</div><div>{max}</div>
                </div>
            </div>
        </>
    )
}

Slider_Range.defaultProps = {
    step: 1,
    min: 0,
    max: 100,
    value: 50,
    defaultLength: 100, 
    OnChangeValue: (e) => {}
  };

  export {Slider_Range};