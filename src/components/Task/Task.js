import { Component } from 'react';
import propTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class Task extends Component {
  static defaultProps = {
    label: undefined,
    done: false,
    created: new Date(),
    onChangeStatus: () => {},
    onDelete: () => {},
    onChangeLabel: () => {},
  };

  static propTypes = {
    label: propTypes.string.isRequired,
    done: propTypes.bool,
    created: propTypes.instanceOf(Date),
    onChangeStatus: propTypes.func,
    onDelete: propTypes.func,
    onChangeLabel: propTypes.func,
  };

  state = {
    edited: false,
    createdFormat: formatDistanceToNow(this.props.created, { includeSeconds: true }),
    newLabel: this.props.label,
  };

  componentDidMount() {
    this.timerID = setInterval(
      () => this.setState({ createdFormat: formatDistanceToNow(this.props.created, { includeSeconds: true }) }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  changeLabel = (e) => {
    if (e.key === 'Enter') {
      this.props.onChangeLabel(e.target.value);
      this.setState({ edited: false });
    }
  };

  enableEdit = () => {
    this.setState({ edited: true });
  };

  render() {
    const { edited, createdFormat, newLabel } = this.state;
    const { done, label } = this.props;

    let classNames = '';
    classNames += done ? ' completed' : '';
    classNames += edited ? ' editing' : '';

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={this.props.onChangeStatus} checked={done} readOnly />
          <label>
            <span className="description">{label}</span>
            <span className="created">{`created ${createdFormat} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={this.enableEdit}></button>
          <button className="icon icon-destroy" onClick={this.props.onDelete}></button>
        </div>
        <input
          type="text"
          className="edit"
          value={newLabel}
          onInput={(e) => {
            this.setState({ newLabel: e.target.value });
          }}
          onKeyDown={this.changeLabel}
        ></input>
      </li>
    );
  }
}
