// vim: syntax=JSX
import React from "react";

export default class Content extends React.Component {
  state = {
    editable: false,
    text: "",
  };

  componentDidMount() {
    if (this.state.editable) this.contentContainer.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.editable && this.state.editable) {
      this.contentContainer.focus();
    }
  }

  bubbleUpEditableSelectedRegion = (e) => {
    const arrowEvents = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
    if (arrowEvents.includes(e.key) && e.shiftKey) {
      this.bubbleUpSelectedRegion(e);
    }
  };

  bubbleUpSelectedRegion = (e) => {
    const { setBtnsGroupPosition, showButtonsGroup } = this.props;
    const selection = window.getSelection();

    if (selection.toString()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setBtnsGroupPosition(rect);
      showButtonsGroup();
    }
  };

  toggleEditMode = () => {
    this.setState({ editable: !this.state.editable });
  };
  handleClick = (e) => {
    console.log(this.state.text);
    e.preventDefault();
    // let flag = 0;
    // if (flag === 0) {
    const commentList = this.props.commentList;
    // console.log(commentList);
    var marks = document.querySelectorAll("mark");

    marks.forEach((mark) => {
      mark.addEventListener("mouseover", (event) => {
        // console.log(event.currentTarget.id);
        commentList.forEach((comment) => {
          // console.log(comment.id);
          // console.log(event.currentTarget.id);
          if (comment.id == event.currentTarget.id) {
            // console.log("Matched");
            this.setState({ text: comment.message });
          }
          // flag = 1;
        });
      });
    });
  };

  render() {
    const editButtonStyles = {
      fontSize: "20px",
      border: "none",
      background: "transparent",
      position: "fixed",
      left: "75%", // <= 100% - App.style.paddingRight(25%)
      top: "10%",
    };

    const contentSectionStyles = {
      textAlign: "justify",
      background: "#fff",
      padding: "20px",
      overflowY: "scroll",
      height: "400px",
      margin: "3%",
    };

    return (
      <div
        onMouseEnter={this.handleClick}
        onMouseLeave={() => {
          this.setState({ text: "" });
        }}
        style={{ margin: "3%" }}
      >
        <button style={editButtonStyles} onClick={this.toggleEditMode}>
          &#x270D;{` edit mode${this.state.editable ? " on" : " off"}`}
        </button>
        <h1 style={{ textAlign: "center" }}>
          The Psychopathology of Everyday Things
        </h1>

        {this.state.text !== "" ? (
          <p style={{ backgroundColor: "lightcyan" }}>{this.state.text}</p>
        ) : null}

        <section
          ref={(elm) => {
            this.contentContainer = elm;
          }}
          contentEditable={this.state.editable}
          style={contentSectionStyles}
          onMouseUp={this.bubbleUpSelectedRegion}
          onMouseMove={this.bubbleUpSelectedRegion}
          onKeyUp={this.bubbleUpEditableSelectedRegion}
        >
          <p>
            The most outstanding monument built by Emperor Shahjahan is the Taj
            Mahal at Agra. It is on the bank of River Yamuna. This grand
            mausoleum was built in the memory of his beloved Queen Mumtaj Mahal.
            It has been described as “a dream in marble designed by fairies and
            completed by jewelers.” It is made of pure white marble. As a
            monument of love “it is unsur passed in the world.” It stands on a
            platform of 8.5 meters height. The mausoleum rises to a height of
            32.4 meters. It is surmounted by cupolas at each corner. The bulbous
            dome in the centre of the cupolas has the ap pearance of an inverted
            lotus. There are four smaller domes at the four corners of the
            building. Four minarets stand at each corner of the terrace. The
            outer walls and the interior walls are richly decorated with
            exquisite inlay work and calligraphy.
          </p>
          <p>
            The most outstanding monument built by Emperor Shahjahan is the Taj
            Mahal at Agra. It is on the bank of River Yamuna. This grand
            mausoleum was built in the memory of his beloved Queen Mumtaj Mahal.
            It has been described as “a dream in marble designed by fairies and
            completed by jewelers.” It is made of pure white marble. As a
            monument of love “it is unsur passed in the world.” It stands on a
            platform of 8.5 meters height. The mausoleum rises to a height of
            32.4 meters. It is surmounted by cupolas at each corner. The bulbous
            dome in the centre of the cupolas has the ap pearance of an inverted
            lotus. There are four smaller domes at the four corners of the
            building. Four minarets stand at each corner of the terrace. The
            outer walls and the interior walls are richly decorated with
            exquisite inlay work and calligraphy.
          </p>
        </section>
      </div>
    );
  }
}
