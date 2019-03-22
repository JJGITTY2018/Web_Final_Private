//import comments CSS
import '../css/comments.css';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Comments from './comments.js';
import Axios from 'axios';

//react-icons - favorites - hearts
import { FaHeart, FaRegHeart } from 'react-icons/fa';

class SongList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favoriteStatus: '',
			currentUserFavs: [],
			data: []
		};
	}
	historyPushHandler = (id, event) => {
		this.props.history.push('/profile/' + id);
		this.props.functionRefresh(id);
	};
	elMapData = (data) => {
		if (data !== null) {
			return data.map((el, i) => {
				return (
					<div className="Songs_container" arr_id={i} key={el.id}>
						<div className="Song_header">
							<div className="song_img">
								<img src={el.img_url} alt={el.title} />
							</div>

							<div className="song_info">
								<h1> {el.title} </h1>
								<h3> {el.sumoffavs} Favorites </h3>
								<div className="song_favorite">{this.checkFavsArrOnSong(el.id, i)}</div>
							</div>
							<Comments
								currentUserID={this.props.props.currentUserID}
								songs_id={el.id}
								functionRefresh={this.props.functionRefresh}
							/>
						</div>
					</div>
				);
			});
		} else {
			return null;
		}
  };
  
  
	onClickAdd = (element_id, arr_id) => {
		Axios.post('/favorites', {
			users_id: this.props.props.currentUserID,
			songs_id: element_id
		}).then(() => {
			this.getUserFavorites();
			this.props.AddFavs(arr_id);
		});
  };
  
	onClickDelete = (element_id, arr_id) => {
		Axios.delete('/favorites', {
			data: {
				users_id: this.props.props.currentUserID,
				songs_id: element_id
			}
		}).then(() => {
			this.props.MinusFavs(arr_id);
			this.getUserFavorites();
		});
  };
  

	getUserFavorites = () => {
		Axios.get('/favorites/users/' + this.props.props.currentUserID)
			.then((res) => {
				// console.log(res)
				let currentUserFavsArr = [];
				res.data.data.map((el) => {
					return currentUserFavsArr.push(el.id);
				});
				this.setState({
					currentUserFavs: currentUserFavsArr
				});
			})
			.then(() => {});
	};
	checkFavsArrOnSong = (element_songs_id, array_id) => {
		if (this.state.currentUserFavs.includes(element_songs_id)) {
			return (
				<button
					name={array_id}
					onClick={() => {
						this.onClickDelete(element_songs_id, array_id);
					}}
				>
					{' '}
					<span>
						{' '}
						<FaHeart />{' '}
					</span>
				</button>
			);
		} else {
			return (
				<button
					onClick={() => {
						this.onClickAdd(element_songs_id, array_id);
					}}
				>
					{' '}
					<FaRegHeart />{' '}
				</button>
			);
		}
	};
	componentDidMount() {
		this.getUserFavorites();
	}
	render() {
		let songsDisplay = this.elMapData(this.props.props.data);
		return <>{songsDisplay}</>;
	}
}
export default withRouter(SongList)


