import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { label, link, color, style, align } = attributes;

	const cls = [
		'mo-button',
		color !== 'primary' ? `mo-button--${color}` : null,
		style !== 'fill' ? `mo-button--${style}` : null,
		align !== 'left' ? `mo-button--${align}` : null
	]

	const blockProps = useBlockProps.save()
	blockProps.className = cls.filter(Boolean).join(' ')

	return (
		<RichText.Content
			{...blockProps}
			tagName="a"
			value={label}
			href={link?.url}
			target={link?.opensInNewTab ? '_blank' : '_self'}
			rel={link?.opensInNewTab ? 'noopener noreferrer' : null}
		/>
	);
}
