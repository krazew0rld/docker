import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	TextControl,
	RangeControl,
} from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';
import './editor.css';

export default function Edit({ attributes, setAttributes }) {

	const { provider, videoId, align, size, transcription } = attributes;

	const cls = [
		'mo-video',
		align !== 'left' ? `mo-video--${align}` : null
	]

	const blockProps = useBlockProps()

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Réglages de la vidéo', 'cd50')}>
					<ToggleGroupControl
						label={__('Fournisseur', 'cd50')}
						value={provider}
						onChange={(value) => setAttributes({ provider: value })}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOption value="youtube" label={__('YouTube', 'cd50')} />
						<ToggleGroupControlOption value="vimeo" label={__('Vimeo', 'cd50')} />
					</ToggleGroupControl>
					<TextControl
						label={__('ID de la vidéo', 'cd50')}
						value={videoId}
						onChange={(value) => setAttributes({ videoId: value })}
					/>
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
					<RangeControl
						label={__('Taille (en pixels)', 'cd50')}
						value={size}
						onChange={(value) => setAttributes({ size: value })}
						min={200}
						max={1200}
						step={10}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
				</PanelBody>
			</InspectorControls>
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
						<RichText
							value={transcription}
							onChange={(value) => setAttributes({ transcription: value })}
							allowedFormats={['italic', 'bold']}
							placeholder={__('Transcription de la vidéo...', 'cd50')}
							tagName="div"
							className="mo-video__transcription"
						/>
					</div>
				</details>
			</div>
		</div>
	);
}
