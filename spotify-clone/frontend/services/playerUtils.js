import TrackPlayer, { AppKilledBehavior, Capability } from 'react-native-track-player';

export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getCurrentTrack();
        isSetup = true;
    }
    catch {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            android: {
                appKilledBehavior: AppKilledBehavior.StopPlaybackAndRemoveNotification,
            },
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
            ],
            progressUpdateEventInterval: 2,
        });
        isSetup = true;
    }
    finally {
        return isSetup;
    }
}

export async function addMocksToQueue() {
    await TrackPlayer.add([
        {
            id: 'dQw4w9WgXcQ',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            title: 'Never Gonna Give You Up',
            artist: 'Rick Astley',
            artwork: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
            duration: 213,
        },
        {
            id: '4NRXx6U8ABQ',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            artwork: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg',
            duration: 200,
        }
    ]);
}
