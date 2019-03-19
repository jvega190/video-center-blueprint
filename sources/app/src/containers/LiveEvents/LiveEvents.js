import React, { Component } from "react";
import { connect } from "react-redux";

import VideoCategories from '../../components/VideoCategories/VideoCategories.js';
import { setVideoDocked } from "../../actions/videoPlayerActions";

class LiveEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchId: this.props.match.params.query,
            categories: [
                {
                    key: "upcoming-events",
                    value: "Upcoming Events",
                    type: "live-event-item",
                    query: {
                        "bool": {
                            "filter": [
                                {
                                    "match": {
                                        "content-type": "/component/stream"
                                    }
                                },
                                {
                                    "range" : {
                                        "startDate_dt" : {
                                            "gt" : "now"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    numResults: 6
                },
                {
                    key: "past-events", 
                    value: "Past Events",
                    type: "live-event-item",
                    query: {
                        "bool": {
                            "filter": [
                                {
                                    "match": {
                                        "content-type": "/component/stream"
                                    }
                                },
                                {
                                    "range" : {
                                        "endDate_dt" : {
                                            "lt" : "now"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    numResults: 6
                }
            ]
        };
    }

    componentWillMount() {
        this.props.setVideoDocked( false );
    }
    render() {
        return (
        <div>
            <VideoCategories 
                categories={ this.state.categories }>
            </VideoCategories>
        </div>
        );
    }
}

function mapStateToProps(store) {
    return { 
        videoInfo: store.video.videoInfo,
        videoStatus: store.video.videoStatus
    };
}

function mapDispatchToProps(dispatch) {
    return({
        setVideoDocked: (docked) => { dispatch(setVideoDocked(docked)) }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveEvents);