import React from "react";

import Content from "./components/Content";
import CommentBox from "./components/CommentBox";
import HighlightButtonsGroup from "./components/HighlightButtonsGroup";
import CommentsList from "./components/CommentsList";

import { saveSelection, restoreSelection } from "./selection-utils";

class LandingPage extends React.Component {
  state = {
    hiddenCommentBox: true,
    hiddenButtonGroup: true,
    highlightBtnsGroupLayout: {
      position: "absolute",
      left: "0",
      top: "0",
      heightInPixel: 28,
      widthInPixel: 70,
    },
    selectedRange: null,
    comments: [],
  };

  // seleted region reactangle [left, top, width, hieght]
  sethighlightBtnsGroupPosition = ({ left, top, width, height }) => {
    const { heightInPixel, widthInPixel } = this.state.highlightBtnsGroupLayout;
    const computedLeft = left + width / 2 - widthInPixel / 2;
    const computedTop = window.scrollY + top - heightInPixel;

    this.setState({
      highlightBtnsGroupLayout: Object.assign(
        this.state.highlightBtnsGroupLayout,
        {
          left: computedLeft,
          top: computedTop,
        }
      ),
    });
  };

  showButtonsGroup = () => {
    this.setState({ hiddenButtonGroup: false });
  };

  saveAndRestoreSelection = () => {
    const savedSelection = saveSelection();
    this.setState({ selectedRange: savedSelection });
    this.toggleCommentBox();
    restoreSelection(savedSelection);
  };

  // Taking advantage of es6 object computed property
  toggleState = (updateState) => {
    this.setState({ [updateState]: !this.state[updateState] });
  };

  toggleCommentBox = () => {
    this.toggleState("hiddenCommentBox");
  };

  // Could be used outside click of HighlightButtonsGroup
  toggleButtonsGroup = () => {
    this.toggleState("hiddenButtonGroup");
  };

  updateCommentList = (newComment) => {
    this.setState({ comments: [...this.state.comments, newComment] });
  };

  render() {
    const {
      hiddenCommentBox,
      hiddenButtonGroup,
      highlightBtnsGroupLayout,
      comments,
      selectedRange,
    } = this.state;

    return (
      <div style={{ margin: "0", padding: "0" }}>
        <div>
          <Content
            setBtnsGroupPosition={this.sethighlightBtnsGroupPosition}
            showButtonsGroup={this.showButtonsGroup}
            commentList={comments}
          />
          <HighlightButtonsGroup
            layout={highlightBtnsGroupLayout}
            hidden={hiddenButtonGroup}
            saveAndRestoreSelection={this.saveAndRestoreSelection}
          />

          <CommentBox
            hidden={hiddenCommentBox}
            selectedRange={selectedRange}
            updateCommentList={this.updateCommentList}
            toggleCommentBox={this.toggleCommentBox}
            toggleButtonsGroup={this.toggleButtonsGroup}
          />
        </div>
        {comments.length > 0 ? (
          <div
            style={{
              fontFamily: "monospace",
              backgroundColor: "black",
              fontWeight: "bold",
              color: "floralwhite",
              border: "2px solid red",
              borderRadius: "12px",
              fontSize: "14px",
            }}
          >
            <h3 style={{ color: "honeydew" }}>List of Comments:</h3>
            <CommentsList comments={comments} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default LandingPage;
