import React from 'react';
import { useState } from 'react';
import ImageUploading from 'react-images-uploading';

const AddComponent = () => {
	// const [images, setImages] = useState([]);
	// const maxNumber = 69;
	// const onChange = (imageList, addUpdateIndex) => {
	// 	// data for submit
	// 	console.log(imageList, addUpdateIndex);
	// 	setImages(imageList);
	// };
	// return (
	// 	<ImageUploading value={images} onChange={onChange} dataURLKey='data_url'>
	// 		{({
	// 			imageList,
	// 			onImageUpload,
	// 			onImageRemoveAll,
	// 			onImageUpdate,
	// 			onImageRemove,
	// 			isDragging,
	// 			dragProps,
	// 		}) => (
	// 			// write your building UI
	// 			<div className='upload__image-wrapper'>
	// 				<button
	// 					style={isDragging ? { color: 'red' } : undefined}
	// 					onClick={onImageUpload}
	// 					{...dragProps}
	// 				>
	// 					Click or Drop here
	// 				</button>
	// 				&nbsp;
	// 				<button onClick={onImageRemoveAll}>Remove image</button>
	// 				{imageList.map((image, index) => (
	// 					<div key={index} className='image-item'>
	// 						<img src={image['data_url']} alt='' width='100' />
	// 						<div className='image-item__btn-wrapper'>
	// 							<button onClick={() => onImageUpdate(index)}>Update</button>
	// 							<button onClick={() => onImageRemove(index)}>Remove</button>
	// 						</div>
	// 					</div>
	// 				))}
	// 			</div>
	// 		)}
	// 	</ImageUploading>
	// );
	return <></>;
};

export default AddComponent;
