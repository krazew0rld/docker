import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { provider, videoId, align, size, transcription } = attributes;

	const cls = [
		'mo-video',
		align !== 'left' ? `mo-video--${align}` : null
	]

	const blockProps = useBlockProps.save()
	blockProps.className = cls.filter(Boolean).join(' ')

	return (
		<div className={cls.filter(Boolean).join(' ')} style={{ width: `${size}px` }}>
			<div className="mo-video__video">
				{provider === 'youtube' && (
					<iframe src={`https://www.youtube.com/embed/${videoId}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				)}
				{provider === 'vimeo' && (
					<iframe src={`https://player.vimeo.com/video/${videoId}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				)}
			</div>
			<details className="mo-accordion mo-video__transcription">
				<summary>
					<span className="mo-accordion__title">{__('Transcription de la vidéo', 'cd50')}</span>
					<span className="mo-accordion__icon">
						<i className="fa-solid fa-chevron-down"></i>
					</span>
				</summary>
				<div className="mo-accordion__content">
					<RichText.Content
						value={transcription}
						tagName="div"
						className="mo-video__transcription"
					/>
				</div>
			</details>
		</div>
	);
}
