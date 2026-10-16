import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import {
	Button,
	ButtonGroup,
	PanelBody,
	RangeControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	ToggleControl,
} from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import './editor.css';

export default function Edit({ attributes, setAttributes, isSelected }) {

	const { file, size, align, isZoomable } = attributes;

	const cls = [
		'mo-image',
		align !== 'left' ? `mo-image--${align}` : null,
		isZoomable ? 'mo-image--zoomable' : null
	]

	const blockProps = useBlockProps()

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Réglages de l\'image', 'cd50')}>
					{size !== 0 && (
						<RangeControl
							label={__('Taille', 'cd50')}
							value={size ? size : file?.width}
							onChange={(value) => setAttributes({ size: value })}
							min={10}
							max={100}
							step={1}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
					)}
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
					<ToggleControl
						label="Agrandir au clic"
						checked={isZoomable}
						onChange={(newValue) => {
							setAttributes({ isZoomable: newValue });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{file && (
					file.caption ? (
						<figure>
							<div className={cls.filter(Boolean).join(' ')} style={{ width: `${size}%` }}>
								<img src={file.url} alt={file.alt} />
							</div>
							<figcaption>{file.caption}</figcaption>
						</figure>
					) : (
						<figure>
							<div className={cls.filter(Boolean).join(' ')} style={{ width: `${size}%` }}>
								<img src={file.url} alt={file.alt} />
							</div>
						</figure>
					)
				)}
				{(isSelected || !file) && (
					<MediaUpload
						onSelect={(value) => setAttributes({ file: value, size: 100 })}
						value={file}
						allowedTypes={['image']}
						render={({ open }) => (
							file ? (
								<ButtonGroup style={{ display: 'flex', gap: '10px', marginTop: 'var(--sp-2)' }}>
									<Button variant="secondary" onClick={open}>
										{__('Modifier l\'image', 'cd50')}
									</Button>
									<Button variant="secondary" isDestructive onClick={() => setAttributes({ file: null })}>
										{__('Supprimer l\'image', 'cd50')}
									</Button>
								</ButtonGroup>
							) : (
								<Button variant="secondary" onClick={open} style={{ marginTop: 'var(--sp-2)' }}>
									{__('Ajouter une image', 'cd50')}
								</Button>
							)
						)}
					/>
				)}
			</div>
		</>
	);
}
