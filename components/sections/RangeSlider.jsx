import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';

const STEP = 100;

const RangeSlider = ({ rtl, values, setValues, MAX, MIN }) => {
  return (
    <div className='flex justify-center flex-wrap'>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => {
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '20px',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '4px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#EDDFB3', '#ccc'],
                  min: MIN,
                  max: MAX,
                  rtl
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
            }}
            className={`h-4 w-4 rounded-full bg-primary-white ${isDragged ? 'bg-primary-dark' : 'bg-primary'} shadow-md outline-none transition-all transform ${isDragged ? 'scale-105' : 'scale-100'}`}
          >
          </div>
        )}
      />
      <div className='w-full flex items-center justify-between my-2 font-Cinzel'>
              <span>₹{values[0]}</span>
              <span>₹{values[1]}</span>
      </div>
    </div>
  );
};

export default RangeSlider;