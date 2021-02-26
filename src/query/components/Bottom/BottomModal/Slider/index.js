import React, { useState, useRef, useEffect, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import useWinSize from '../../../../../common/hooks/useWinSize';
import './index.css';

const Slider = memo((props) => {
  const {
    title, currentStartHours, currentEndHours,
    onStartChanged, onEndChanged
  } = props;

  const winSize = useWinSize();

  const startHandle = useRef();
  const endHandle = useRef();

  const lastStartX = useRef();
  const lastEndX = useRef();

  const range = useRef();
  const rangeWidth = useRef();

  const prevCurrentStartHours = useRef(currentStartHours);
  const prevCurrentEndHours = useRef(currentEndHours);

  const [start, setStart] = useState(() => (currentStartHours / 24) * 100);
  const [end, setEnd] = useState(() => (currentEndHours / 24) * 100);

  if (prevCurrentStartHours.current !== currentStartHours) {
    setStart((currentStartHours / 24) * 100);
    prevCurrentStartHours.current = currentStartHours;
  }

  if (prevCurrentEndHours.current !== currentEndHours) {
    setEnd((currentEndHours / 24) * 100);
    prevCurrentEndHours.current = currentEndHours;
  }

  const startPercent = useMemo(() => {
    if (start > 100) {
      return 100;
    }
    if (start < 0) {
      return 0;
    }
    return start;
  }, [start]);

  const endPercent = useMemo(() => {
    if (end > 100) {
      return 100;
    }
    if (end < 0) {
      return 0;
    }
    return end;
  }, [end]);

  const startHours = useMemo(() => (
    Math.round((startPercent * 24) / 100)
  ), [startPercent]);

  const endHours = useMemo(() => (
    Math.round((endPercent * 24) / 100)
  ), [endPercent]);

  const startText = useMemo(() => (
    String(startHours).padStart(2, '0') + ':00'
  ), [startHours]);

  const endText = useMemo(() => (
    String(endHours).padStart(2, '0') + ':00'
  ), [endHours]);

  const onStartTouchBegin = (e) => {
    const touch = e.targetTouches[0];
    lastStartX.current = touch.pageX;
  };

  const onEndTouchBegin = (e) => {
    const touch = e.targetTouches[0];
    lastEndX.current = touch.pageX;
  };

  const onStartTouchMove = (e) => {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastStartX.current;
    lastStartX.current = touch.pageX;
    setStart(start => start + (distance / rangeWidth.current) * 100);
  };

  const onEndTouchMove = (e) => {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastEndX.current;
    lastEndX.current = touch.pageX;
    setEnd(end => end + (distance / rangeWidth.current) * 100);
  }

  useEffect(() => {
    rangeWidth.current = parseFloat(
      window.getComputedStyle(range.current).width
    );
  }, [winSize.width]);

  useEffect(() => {
    const currentStartRef = startHandle.current;
    const currentEndRef = endHandle.current;

    currentStartRef.addEventListener('touchstart', onStartTouchBegin, {passive: true});
    currentStartRef.addEventListener('touchmove', onStartTouchMove, {passive: true});
    currentEndRef.addEventListener('touchstart', onEndTouchBegin, {passive: true});
    currentEndRef.addEventListener('touchmove', onEndTouchMove, {passive: true});

    return () => {
      currentStartRef.removeEventListener('touchstart', onStartTouchBegin, {passive: true});
      currentStartRef.removeEventListener('touchmove', onStartTouchMove, {passive: true});
      currentEndRef.removeEventListener('touchstart', onEndTouchBegin, {passive: true});
      currentEndRef.removeEventListener('touchmove', onEndTouchMove, {passive: true});
    };
  });

  useEffect(() => {
    onStartChanged(startHours);
  }, [startHours, onStartChanged]);

  useEffect(() => {
    onEndChanged(endHours);
  }, [endHours, onEndChanged]);

  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={range}>
          <div
            className="slider-range"
            style={{
              left: startPercent + '%',
              width: endPercent - startPercent + '%'
            }}
          />
          <i
            className="slider-handle"
            ref={startHandle}
            style={{
              left: startPercent + '%'
            }}
          >
            <span>{startText}</span>
          </i>
          <i
            className="slider-handle"
            ref={endHandle}
            style={{
              left: endPercent + '%'
            }}
          >
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  );
});

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  currentStartHours: PropTypes.number.isRequired,
  currentEndHours: PropTypes.number.isRequired,
  onStartChanged: PropTypes.func.isRequired,
  onEndChanged: PropTypes.func.isRequired
};

export default Slider;
