import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'

export default (props) => (
  <div>
    <span>
      <ion-icon name='share' />
      &nbsp;Share:
    </span>
    <span>
      <FacebookShareButton url={props.url}>
        <FacebookIcon size={24} round={true} />
      </FacebookShareButton>
    </span>
    <span>
      <TwitterShareButton url={props.url}>
        <TwitterIcon size={24} round={true} />
      </TwitterShareButton>
    </span>
    <style jsx>{`
      align-items: center;
      :nth-child(n) {
        display: inline-flex;
      }
      :not(:last-child) {
        margin-right: 0.5rem;
      }
      span:not(:first-child) {
        cursor: pointer;
      }
      span:not(:first-child):hover {
        opacity: 0.85;
      }
    `}</style>
  </div>
)
