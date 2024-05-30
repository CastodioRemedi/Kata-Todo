import { Component } from 'react';
import propTypes from 'prop-types';
import { intervalToDuration } from 'date-fns';

export default class TaskTimer extends Component {
  state = {
    currentSeconds: this.props.seconds,
    isMinus: false,
    isCounting: false,
  };

  counter = undefined;

  formatTimeTo2Sym = (t) => (String(t).length === 2 ? t : `0${t}`);

  getTimerString = (sec) => {
    let zero = new Date(1970, 0, 1);
    let current = new Date(1970, 0, 1).setSeconds(sec);

    let interval = intervalToDuration({
      start: zero,
      end: current,
    });

    let dateString = [];
    let timerString = [];
    if (interval.years) dateString.push(`${interval.years} years`);
    if (interval.months) dateString.push(`${interval.months} months`);
    if (interval.days) dateString.push(`${interval.days} days`);
    if (interval.hours) timerString.push(this.formatTimeTo2Sym(interval.hours));
    timerString.push(this.formatTimeTo2Sym(interval.minutes));
    timerString.push(this.formatTimeTo2Sym(interval.seconds));

    const res = `${dateString.join(' ')} ${timerString.join(':')}`;
    return res;
  };

  toggleCounting = () => {
    if (!this.state.isCounting) {
      this.setState({ isCounting: true });
      this.counter = setInterval(() => {
        this.setState((state) => {
          let newSeconds;
          let isMinus = false;
          if (state.currentSeconds > 0 && !state.isMinus) {
            newSeconds = state.currentSeconds - 1;
          } else {
            newSeconds = state.currentSeconds + 1;
            isMinus = true;
          }
          return {
            currentSeconds: newSeconds,
            isMinus: isMinus,
          };
        });
      }, 1000);
    } else {
      clearInterval(this.counter);
      this.setState({ isCounting: false });
    }
  };

  componentWillUnmount() {
    clearInterval(this.counter);
  }

  render() {
    let classNames = 'description';
    classNames += this.state.isMinus ? ' alert' : '';

    let button = (
      <button
        onClick={this.toggleCounting}
        className={`icon icon-${this.state.isCounting ? 'pause' : 'play'}`}
      ></button>
    );
    let timer = this.getTimerString(this.state.currentSeconds);
    return (
      <span className={classNames}>
        {this.state.isMinus ? '-' : ''}
        {timer}
        {button}
      </span>
    );
  }

  static defaultProps = {
    seconds: undefined,
  };

  static propTypes = {
    seconds: propTypes.number.isRequired,
  };
}
