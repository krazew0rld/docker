import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import { useEffect } from '@wordpress/element';
import './editor.css';

export default function Edit({ attributes, setAttributes }) {

	const { title, size, align } = attributes;

	const cls = [
		'mo-note',
		align !== 'left' ? `mo-note--${align}` : null
	]

	useEffect(() => {
		size === '100' && setAttributes({ align: 'left' })
	}, [size])

	const blockProps = useBlockProps()

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Réglages de la note', 'cd50')}>
					<ToggleGroupControl
						label={__('Taille', 'cd50')}
						value={size}
						onChange={(value) => setAttributes({ size: value })}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOption value="25" label={__('25%', 'cd50')} />
						<ToggleGroupControlOption value="50" label={__('50%', 'cd50')} />
						<ToggleGroupControlOption value="75" label={__('75%', 'cd50')} />
						<ToggleGroupControlOption value="100" label={__('100%', 'cd50')} />
					</ToggleGroupControl>
					{size !== '100' && (
						<ToggleGroupControl
							label={__('Alignement', 'cd50')}
							value={align}
							onChange={(value) => setAttributes({ align: value })}
							isBlock
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						>
							<ToggleGroupControlOptionIcon value="left" label={__('Gauche', 'cd50')} icon={alignLeft} />
							<ToggleGroupControlOptionIcon value="center" label={__('Centre', 'cd50')} icon={alignCenter} />
							<ToggleGroupControlOptionIcon value="right" label={__('Droite', 'cd50')} icon={alignRight} />
						</ToggleGroupControl>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className={cls.filter(Boolean).join(' ')} style={{ width: size !== '100' ? `${size}%` : null }}>
					<div className="mo-note__header">
						<span className="mo-note__icon">
							<i className="fa-solid fa-info fa-xl"></i>
						</span>
						<RichText
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							allowedFormats={[]}
							placeholder={__('Titre de la note', 'cd50')}
							tagName="span"
							className="mo-note__title"
						/>
					</div>
					<div className="mo-note__content">
						<InnerBlocks allowedBlocks={['core/paragraph', 'cd50/button']} />
					</div>
				</div>
			</div>
		</>
	);
}
