import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { file, align, style, color } = attributes;

	const cls = [
		'mo-download',
		align !== 'left' ? `mo-download--${align}` : null,
		style !== 'default' ? `mo-download--${style}` : null,
		color !== 'primary' ? `mo-download--${color}` : null
	]

	const blockProps = useBlockProps.save()
	blockProps.className = cls.filter(Boolean).join(' ')

	return (
		<a href={file?.url} target="_blank" rel="noopener noreferrer" {...blockProps}>
			<div className="mo-download__container">
				<span className="mo-download__icon">
					<i className="fa-solid fa-file-arrow-down fa-xl"></i>
				</span>
				<span className="mo-download__title">
					{file ? file?.title : __('Aucun fichier', 'cd50')}
				</span>
			</div>
			<div className="mo-download__info">
				<span className="mo-download__size">{file?.filesizeHumanReadable}</span>
				<span className="mo-download__type">{file?.filename.split('.').pop().toUpperCase()}</span>
			</div>
		</a>
	);
}
