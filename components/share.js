import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

export default (props) => (
  <>
    <div>
      <span>Share:</span>
      <FacebookShareButton className='share-button' url={props.url}>
        <FacebookIcon size={24} round={true} />
      </FacebookShareButton>
      <TwitterShareButton className='share-button' url={props.url}>
        <TwitterIcon size={24} round={true} />
      </TwitterShareButton>
    </div>
    <style jsx>{`
      span,
      .share-button:not(:last-child) {
        margin-right: 0.5rem;
      }
      .share-button {
        cursor: pointer;
        display: inline-flex;
        vertical-align: middle;
      }
      .share-button:hover {
        opacity: 0.9;
      }
    `}</style>
  </>
)
