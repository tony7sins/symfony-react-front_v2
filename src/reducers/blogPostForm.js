import { IMAGE_UPLOAD_REQUEST, IMAGE_UPLOADED, IMAGE_UPLOAD_ERROR } from "../actions/types"

export default (state = {
    isImageUploading: false,
    image: null,
    images: [],
}, action) => {
    switch (action.type) {
        case IMAGE_UPLOAD_REQUEST:
            return {
                ...state,
                isImageUploading: true,
            }
        case IMAGE_UPLOADED:
            return {
                ...state,
                isImageUploading: false,
                image: action.payload.image,
                images: state.images.concat(action.payload.image)
            }
        case IMAGE_UPLOAD_ERROR:
            return {
                ...state,
                isImageUploading: false,
            }
        default:
            return state
    }
}