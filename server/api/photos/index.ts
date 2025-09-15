// server/api/photos.ts

import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    // Static list of photos - this avoids file system access issues in serverless environments
    const photoFiles = [
        'confoo_2025_01.jpg',
        'confoo_2025_02.jpeg',
        'dad_bella_dance.jpeg',
        'dan_kcdc.jpeg',
        'dan_ken.jpeg',
        'dan_nate_vegas.jpeg',
        'dan_neal_glenn.jpeg',
        'dan_neal.jpeg',
        'dan_purnima_dashaun_springone.png',
        'dan_shar_nate_vegas.jpeg',
        'dan_springone_graphql_2023.png',
        'dan_taylor_spring_io.jpeg',
        'family_hilton_head.jpeg',
        'golf_lasvegas.jpeg',
        'javaone_01.jpeg',
        'javaone_02.jpeg',
        'kcdc_01.jpeg',
        'kcdc_02.jpeg',
        'kcdc_03.jpeg',
        'lawrence_dan_connecttech.jpeg',
        'spring_io_2025_01.jpeg',
        'spring_io_2025_02.jpg',
        'spring_io_2025_03.jpg',
        'spring_io_2025_04.jpg',
        'spring_io_2025_05.jpg',
        'spring_io_dan_dashaun.jpeg',
        'spring_io_laur.jpeg',
        'spring_io_morning_session.jpeg',
        'spring_io_my_session.jpeg',
        'spring_one_2024_01.jpeg',
        'spring_one_2024_02.jpeg',
        'spring_one_2024_03.jpeg',
        'spring_one_2024_04.jpeg',
        'springone_office_hours.png',
        'team_devnexus.jpeg',
        'vmware_raghu.jpeg',
        'vmware_sanfran.jpeg',
        'youtube_01.jpeg'
    ];

    try {
        const photos = photoFiles.map((filename, index) => ({
            id: index + 1,
            filename,
            src: `/images/photos/${filename}`,
            width: 1024,  // placeholder width
            height: 768,  // placeholder height
            alt: `Photo of ${filename.replace(/\.[^/.]+$/, "").replace(/_/g, ' ')}`,
            size: 0, // Not available in static mode
            lastModified: new Date().toISOString()
        }));

        return photos;
    } catch (error) {
        console.error('Error in photos API:', error);
        event.node.res.statusCode = 500;
        return { error: 'Failed to load photos', details: error instanceof Error ? error.message : String(error) };
    }
});