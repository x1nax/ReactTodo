import './Task.css';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import { Component } from 'react';

export default class Task extends Component {
  state = {
    editMode: false,
    value: this.props.item,
  };

  onLableChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onSubmitInput = (e) => {
    const { id } = this.props;
    const { value } = this.state;
    const { onEdit } = this.props;
    if (e.key === 'Enter' && value !== '') {
      onEdit(value, id);
      this.setState({ editMode: false });
    }
  };

  render() {
    const { editMode } = this.state;
    const { value } = this.state;
    const { isComplited } = this.props;
    const { id } = this.props;
    const { item } = this.props;
    const { time } = this.props;
    const { onDelete } = this.props;
    const { complite } = this.props;
    const { isHidden } = this.props;
    const elem = editMode ? (
      <input className="edit" onChange={this.onLableChange} onKeyDown={this.onSubmitInput} value={value} />
    ) : (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={() => {
            isComplited(id);
          }}
        />
        <label>
          <span className="description">{item}</span>
          <span className="created">{formatDistanceToNow(time, { includeSeconds: true })}</span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          onClick={() => {
            this.setState({ editMode: true });
          }}
        />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => {
            onDelete(id);
          }}
        />
      </div>
    );
    return <li className={classNames({ completed: complite, isHidden })}>{elem}</li>;
  }
}
