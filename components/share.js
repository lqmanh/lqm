import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'

export default (props) => (
  <div>
    <span>
      <ion-icon name='share' />
      &nbsp;Share:
    </span>
    <div className='share-button'>
      <FacebookShareButton url={props.url}>
        <FacebookIcon size={24} round={true} />
      </FacebookShareButton>
    </div>
    <div className='share-button'>
      <TwitterShareButton url={props.url}>
        <TwitterIcon size={24} round={true} />
      </TwitterShareButton>
    </div>
    <style jsx>{`
      align-items: center;
      :nth-child(n) {
        display: inline-flex;
        vertical-align: middle;
      }
      :not(:last-child) {
        margin-right: 0.5rem;
      }
    `}</style>
  </div>
)
