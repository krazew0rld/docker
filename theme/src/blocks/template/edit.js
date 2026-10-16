import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.css';

export default function Edit({attributes, setAttributes}) {

	const {} = attributes;
	
	const cls = [
		'mo-template'
	]

	const blockProps = useBlockProps({
		className: cls.filter(Boolean).join(' '),
	})
	
	return (
		<p { ...blockProps }>
			{ __( 'My First Block – hello from the editor!', 'my-first-block' ) }
		</p>
	);
}
