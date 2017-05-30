import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card, {Card2} from './Card';

const style = {
  width: 400,
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      cards: [{
        id: 1,
        text: '1',
        subText: '1',
        flag: true,
      }, {
        id: 2,
        text: '2',
        subText: '2',
        flag: true,
      }, {
        id: 3,
        text: '3',
        subText: '3',
        flag: false,
      }, {
        id: 4,
        text: '4',
        subText: '4',
        flag: true,
      }, {
        id: 5,
        text: '5',
        flag: true,
      }, {
        id: 6,
        text: '6',
        flag: false,
      }, {
        id: 7,
        text: '7',
        flag: false,
      }, {
        id: 8,
        text: '8',
        flag: false,
      }, {
        id: 0,
        text: '0',
        flag: false,
      }],
    };
  }

  moveCard(dragIndex, hoverIndex) {
    const {cards} = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));
  }

  render() {
    const {cards} = this.state;

    const items = [];
    for (let i = 0; i < cards.length; ++i) {
      if (cards[i].flag && cards[i + 1].flag) {
        const card = cards[i];
        const card1 = cards[i + 1];
        items.push(<div style={{borderStyle: 'solid', borderWidth: "5px"}}>
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            flag={card.flag}
            subText={card.subText}
            moveCard={this.moveCard}
          />
          <Card
            key={card1.id}
            index={i}
            id={card1.id}
            text={card1.text}
            flag={card1.flag}
            subText={card.subText}
            moveCard={this.moveCard}
          />
        </div>);
        ++i;
      } else {
        const card = cards[i];
        items.push(<Card2
          key={card.id}
          index={i}
          id={card.id}
          text={card.text}
          flag={card.flag}
          subText={card.subText}
          moveCard={this.moveCard}
        />);
      }
    }

    return (
      <div style={style}>
        {items}
      </div>
    );
  }
}
